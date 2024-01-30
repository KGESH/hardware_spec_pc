use serde::{Deserialize, Serialize};
use std::any::Any;
use wmi::{WMIConnection, WMIDateTime};

use sysinfo;

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
}

pub fn get_disks_info(
    wmi_con: &WMIConnection,
) -> Result<Vec<Win32DiskDrive>, Box<dyn std::error::Error>> {
    let disks: Vec<Win32DiskDrive> = wmi_con.query()?;
    for disk in &disks {
        let disk_detail = format!("{:#?}\n", disk);
        println!("{}", disk_detail);
    }

    // Todo: remove
    let debugDisks = sysinfo::Disks::new_with_refreshed_list();
    debugDisks.iter().for_each(|disk| {
        println!("======== Disk ========");
        let name = disk.name().to_str().unwrap().to_string();
        let kind = disk.kind().to_string();
        let file_system = disk.file_system().to_str().unwrap().to_string();
        let total_space = disk.total_space();
        let available_space = disk.available_space(); // Todo: Check single disk system.
        let removable = disk.is_removable();

        println!("======== Disk ========");
        println!("Total size: {}", total_space);
        println!("Disk Kind: {}", disk.kind());
        println!("Available space: {}", disk.available_space());
        println!("Disk Type ID: {:?}", disk.type_id());
        println!("{:#?}", disk);
    });

    Ok(disks)
}
