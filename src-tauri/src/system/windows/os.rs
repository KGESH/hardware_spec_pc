use serde::{Deserialize, Serialize};
use wmi::{WMIConnection, WMIDateTime};

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename = "Win32_OperatingSystem")]
#[serde(rename_all = "PascalCase")]
pub struct Win32OperatingSystem {
    pub name: Option<String>,
    pub boot_device: Option<String>,
    pub build_number: Option<String>,
    pub build_type: Option<String>,
    pub caption: Option<String>, // caption will print like "Microsoft Windows 10 Home"
    pub code_set: Option<String>,
    pub country_code: Option<String>,
    pub creation_class_name: Option<String>,
    pub cs_creation_class_name: Option<String>,
    pub csd_version: Option<String>,
    pub cs_name: Option<String>,
    pub current_time_zone: Option<i16>,
    pub debug: Option<bool>,
    pub description: Option<String>,
    pub distributed: Option<bool>,
    pub encryption_level: Option<u32>,
    pub foreground_application_boost: Option<u8>,
    pub free_physical_memory: Option<u64>,
    pub free_space_in_paging_files: Option<u64>,
    pub free_virtual_memory: Option<u64>,
    pub install_date: Option<WMIDateTime>,
    pub large_system_cache: Option<u32>,
    pub last_boot_up_time: Option<WMIDateTime>,
    pub local_date_time: Option<WMIDateTime>,
    pub locale: Option<String>,
    pub manufacturer: Option<String>,
    pub organization: Option<String>,
    pub os_architecture: Option<String>,
    pub os_language: Option<u32>,
    pub os_product_suite: Option<u32>,
    pub os_type: Option<u16>,
    pub plus_product_id: Option<String>,
    pub plus_version_number: Option<String>,
    pub serial_number: Option<String>,
    pub status: Option<String>,
    pub version: Option<String>,
    pub max_number_of_processes: Option<u32>,
    pub max_process_memory_size: Option<u64>,
    pub mui_languages: Option<Vec<String>>,
    pub number_of_licensed_users: Option<u32>,
    pub number_of_processes: Option<u32>,
    pub number_of_users: Option<u32>,
    pub operating_system_sku: Option<u32>,
    pub other_type_description: Option<String>,
    pub pae_enabled: Option<bool>,
    pub portable_operating_system: Option<bool>,
    pub primary: Option<bool>,
    pub product_type: Option<u32>,
    pub registered_user: Option<String>,
    pub service_pack_major_version: Option<u16>,
    pub service_pack_minor_version: Option<u16>,
    pub size_stored_in_paging_files: Option<u64>,
    pub suite_mask: Option<u32>,
    pub system_device: Option<String>,
    pub system_directory: Option<String>,
    pub system_drive: Option<String>,
    pub total_swap_space_size: Option<u64>,
    pub total_virtual_memory_size: Option<u64>,
    pub total_visible_memory_size: Option<u64>,
    pub windows_directory: Option<String>,
    // ... add other fields as needed ...
}


pub fn get_os_info(wmi_con: &WMIConnection) -> Result<Vec<Win32OperatingSystem>, Box<dyn std::error::Error>> {
    let operatingSystems: Vec<Win32OperatingSystem> = wmi_con.query()?;
    for os in &operatingSystems {
        let os_detail = format!("{:#?}\n", os);
        println!("{}", os_detail);
    }

    Ok(operatingSystems)
}