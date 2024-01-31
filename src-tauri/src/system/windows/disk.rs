use serde::{Deserialize, Serialize};
use sysinfo;
use wmi::{WMIConnection, WMIDateTime};

use crate::system::windows::native::win32_disk;

#[derive(Serialize, Deserialize, Debug, Clone)]
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
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "PascalCase")]
pub struct Win32DiskDriveExpended {
    #[serde(flatten)]
    pub base: Win32DiskDrive, // Embed the base struct
    pub disk_kind: Option<String>, // Field to store disk kind
                                   // ... add other fields as needed ...
}

pub fn get_disks_info(
    wmi_con: &WMIConnection,
) -> Result<Vec<Win32DiskDriveExpended>, Box<dyn std::error::Error>> {
    let mut base_disks: Vec<Win32DiskDrive> = wmi_con.query()?;

    let mut disks = base_disks
        .iter()
        .map(|disk| {
            let disk_kind = win32_disk::get_disk_kind(disk.device_id.as_ref().unwrap());
            Win32DiskDriveExpended {
                base: disk.clone(),
                disk_kind,
            }
        })
        .collect::<Vec<Win32DiskDriveExpended>>();

    Ok(disks)
}
