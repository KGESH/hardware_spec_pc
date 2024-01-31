use serde::{Deserialize, Serialize};
// Todo: remove
use sysinfo;

use wmi::{WMIConnection, WMIDateTime};

use std::ffi::{c_void, OsStr, OsString};
use std::mem::size_of;
use std::os::windows::ffi::OsStrExt;
use std::os::windows::ffi::OsStringExt;

use std::path::Path;
use windows::core::{Error, HRESULT, PCWSTR};
use windows::Win32::Foundation::{CloseHandle, HANDLE, MAX_PATH};
use windows::Win32::Storage::FileSystem::{
    CreateFileW, FindFirstVolumeW, FindNextVolumeW, FindVolumeClose, GetDiskFreeSpaceExW,
    GetDriveTypeW, GetVolumeInformationW, GetVolumePathNamesForVolumeNameW, FILE_ACCESS_RIGHTS,
    FILE_SHARE_READ, FILE_SHARE_WRITE, OPEN_EXISTING,
};
use windows::Win32::System::Ioctl::{
    PropertyStandardQuery, StorageDeviceSeekPenaltyProperty, DEVICE_SEEK_PENALTY_DESCRIPTOR,
    IOCTL_STORAGE_QUERY_PROPERTY, STORAGE_PROPERTY_QUERY,
};
use windows::Win32::System::WindowsProgramming::{DRIVE_FIXED, DRIVE_REMOVABLE};
use windows::Win32::System::IO::DeviceIoControl;

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename = "Win32_DiskDrive")]
#[serde(rename_all = "PascalCase")]
pub struct Win32DiskDrive {
    pub availability: Option<u16>,
    pub bytes_per_sector: Option<u32>,
    pub caption: Option<String>,
    pub device_id: Option<String>,
    pub firmware_revision: Option<String>,
    pub interface_type: Option<String>,
    pub manufacturer: Option<String>,
    pub media_type: Option<String>,
    pub model: Option<String>,
    pub name: Option<String>,
    pub partitions: Option<u32>,
    pub pnp_device_id: Option<String>,
    pub sectors_per_track: Option<u32>,
    pub serial_number: Option<String>,
    pub size: Option<u64>,
    pub status: Option<String>,
    pub total_cylinders: Option<u64>,
    pub total_heads: Option<u32>,
    pub total_sectors: Option<u64>,
    pub total_tracks: Option<u64>,
    // ... add other fields as needed ...
    // pub disk_kind: Option<String>, // Field to store disk kind
}

pub fn get_disks_info(
    wmi_con: &WMIConnection,
) -> Result<Vec<Win32DiskDrive>, Box<dyn std::error::Error>> {
    let mut disks: Vec<Win32DiskDrive> = wmi_con.query()?;
    for disk in disks.iter_mut() {
        if let Some(ref device_id) = disk.device_id {
            // disk.disk_kind = get_disk_kind(device_id);
            let disk_kind = get_disk_kind(device_id).unwrap_or("Fetch fail".to_string());
            println!("Fetched Disk kind: {:?}", disk_kind);
        }
    }
    // for disk in &disks {
    //     let disk_detail = format!("{:#?}\n", disk);
    //     println!("{}", disk_detail);
    //     println!("======== WMI Disk Name ========");
    //     println!("Name: {}", disk.name.as_ref().unwrap());
    // }

    // Todo: remove
    // let debugDisks = sysinfo::Disks::new_with_refreshed_list();
    // debugDisks.iter().for_each(|disk| {
    //     println!("======== SysInfo Disk ========");
    //     let name = disk.name().to_str().unwrap().to_string();
    //     let kind = disk.kind().to_string();
    //     let file_system = disk.file_system().to_str().unwrap().to_string();
    //     let total_space = disk.total_space();
    //     let available_space = disk.available_space(); // Todo: Check single disk system.
    //     let removable = disk.is_removable();
    //
    //     println!("======== Disk ========");
    //     println!("Name: {}", name);
    //     println!("Total size: {}", total_space);
    //     println!("Disk Kind: {}", disk.kind());
    //     println!("Available space: {}", disk.available_space());
    //     println!("{:#?}", disk);
    // });

    Ok(disks)
}

struct HandleWrapper(HANDLE);

impl HandleWrapper {
    unsafe fn new(drive_name: &[u16], open_rights: FILE_ACCESS_RIGHTS) -> Result<Self, Error> {
        let handle = CreateFileW(
            PCWSTR::from_raw(drive_name.as_ptr()),
            open_rights.0,
            FILE_SHARE_READ | FILE_SHARE_WRITE,
            None, // lpSecurityAttributes
            OPEN_EXISTING,
            Default::default(),
            HANDLE::default(),
        )?;

        Ok(Self(handle))
    }
}

impl Drop for HandleWrapper {
    fn drop(&mut self) {
        unsafe {
            CloseHandle(self.0);
        }
    }
}

fn get_disk_kind(device_id: &str) -> Option<String> {
    let path = format!(r"\\.\{}", device_id);
    let wstr: Vec<u16> = OsStr::new(&path).encode_wide().chain(Some(0)).collect();
    let handle_wrapper = unsafe { HandleWrapper::new(&wstr, Default::default()).ok()? };

    let mut query = STORAGE_PROPERTY_QUERY {
        PropertyId: StorageDeviceSeekPenaltyProperty,
        QueryType: PropertyStandardQuery,
        AdditionalParameters: [0],
    };

    let mut descriptor: DEVICE_SEEK_PENALTY_DESCRIPTOR = unsafe { std::mem::zeroed() };
    let mut returned: u32 = 0;

    let result = unsafe {
        DeviceIoControl(
            handle_wrapper.0,
            IOCTL_STORAGE_QUERY_PROPERTY,
            Some(&mut query as *mut _ as *const c_void),
            size_of::<STORAGE_PROPERTY_QUERY>() as u32,
            Some(&mut descriptor as *mut _ as *mut c_void),
            size_of::<DEVICE_SEEK_PENALTY_DESCRIPTOR>() as u32,
            Some(&mut returned),
            None,
        )
    };

    if result.is_ok() {
        Some(
            if descriptor.IncursSeekPenalty.as_bool() {
                "HDD"
            } else {
                "SSD"
            }
            .to_string(),
        )
    } else {
        None
    }
}
