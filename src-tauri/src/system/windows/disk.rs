use serde::{Deserialize, Serialize};
// Todo: remove
use sysinfo;

use wmi::{WMIConnection, WMIDateTime};

use std::ffi::OsStr;
use std::os::windows::ffi::OsStrExt;
use windows::{
    core::{Error, HRESULT, PCWSTR},
    Win32::{
        Foundation::{CloseHandle, HANDLE, MAX_PATH},
        Storage::FileSystem::{CreateFileW, FILE_SHARE_READ, FILE_SHARE_WRITE, OPEN_EXISTING},
        System::Ioctl::{
            StorageDeviceSeekPenaltyProperty, DEVICE_SEEK_PENALTY_DESCRIPTOR,
            IOCTL_STORAGE_QUERY_PROPERTY, STORAGE_PROPERTY_QUERY,
        },
        System::IO::DeviceIoControl,
    },
};

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
    pub disk_kind: Option<String>, // Field to store disk kind
}

pub fn get_disks_info(
    wmi_con: &WMIConnection,
) -> Result<Vec<Win32DiskDrive>, Box<dyn std::error::Error>> {
    let mut disks: Vec<Win32DiskDrive> = wmi_con.query()?;
    for disk in disks.iter_mut() {
        if let Some(ref device_id) = disk.device_id {
            disk.disk_kind = get_disk_kind(device_id);
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

fn get_disk_kind(device_id: &str) -> Option<String> {
    let path = format!(r"\\.\{}", device_id);
    let wstr: Vec<u16> = OsStr::new(&path).encode_wide().chain(Some(0)).collect();

    let handle = unsafe {
        CreateFileW(
            PCWSTR(wstr.as_ptr()),
            0,
            FILE_SHARE_READ | FILE_SHARE_WRITE,
            std::ptr::null_mut(),
            OPEN_EXISTING,
            0,
            HANDLE(0),
        )
    };

    if handle.is_invalid() {
        return None;
    }

    let mut query = STORAGE_PROPERTY_QUERY {
        PropertyId: StorageDeviceSeekPenaltyProperty,
        QueryType: 0,
        AdditionalParameters: [0],
    };

    let mut descriptor: DEVICE_SEEK_PENALTY_DESCRIPTOR = unsafe { std::mem::zeroed() };

    let mut returned = 0;

    let result = unsafe {
        DeviceIoControl(
            handle,
            IOCTL_STORAGE_QUERY_PROPERTY,
            &mut query as *mut _ as _,
            std::mem::size_of_val(&query) as u32,
            &mut descriptor as *mut _ as _,
            std::mem::size_of_val(&descriptor) as u32,
            &mut returned,
            std::ptr::null_mut(),
        )
    };

    unsafe {
        CloseHandle(handle);
    }

    if result.as_bool() {
        Some(
            if descriptor.IncursSeekPenalty != 0 {
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
