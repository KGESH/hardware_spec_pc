// Custom native win32 disk implementation for sysinfo crate.
// https://github.com/GuillaumeGomez/sysinfo/blob/master/src/windows/disk.rs

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

pub fn get_disk_kind(device_id: &str) -> Option<String> {
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
