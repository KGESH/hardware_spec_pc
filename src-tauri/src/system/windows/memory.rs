use serde::{Deserialize, Serialize};
use wmi::{WMIConnection, WMIDateTime};

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename = "Win32_PhysicalMemory")]
#[serde(rename_all = "PascalCase")]
pub struct Win32PhysicalMemory {
    // RAM size in bytes
    pub capacity: Option<u64>,
    pub manufacturer: Option<String>,
    // Often used for the model name
    pub part_number: Option<String>,
    // Speed of memory in MHz
    pub speed: Option<u32>,
    // Physical label of the socket or circuit board
    pub device_locator: Option<String>,
    // Type of physical memory
    pub memory_type: Option<u16>,
    // Form factor for the memory chip
    pub form_factor: Option<u16>,
    pub serial_number: Option<String>,
    // Unique identifier for the memory device
    pub tag: Option<String>,
    // Data width of the physical memory in bits
    pub data_width: Option<u16>,
    pub total_width: Option<u16>,  // Total width in bits, including error correction bits
    // Add more fields as needed
}

pub fn get_rams_info(wmi_con: &WMIConnection) -> Result<Vec<Win32PhysicalMemory>, Box<dyn std::error::Error>> {
    let rams: Vec<Win32PhysicalMemory> = wmi_con.query()?;
    for ram in &rams {
        let ram_detail = format!("{:#?}\n", ram);
        println!("{}", ram_detail);
    }

    Ok(rams)
}