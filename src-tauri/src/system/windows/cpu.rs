use wmi::{WMIConnection, WMIDateTime};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename = "Win32_Processor")]
#[serde(rename_all = "PascalCase")]
pub struct Win32Processor {
    address_width: Option<u16>,
    architecture: Option<u16>,
    asset_tag: Option<String>,
    availability: Option<u16>,
    caption: Option<String>,
    current_clock_speed: Option<u32>,
    manufacturer: Option<String>,
    max_clock_speed: Option<u32>,
    name: Option<String>,
    number_of_cores: Option<u32>,
    number_of_logical_processors: Option<u32>,
    processor_id: Option<String>,
    status: Option<String>,
    // Add more fields here as needed
}


pub fn get_cpu_info(wmi_con: &WMIConnection) -> Result<Vec<Win32Processor>, Box<dyn std::error::Error>> {
    let processors: Vec<Win32Processor> = wmi_con.query()?;
    for processor in &processors {
        let processor_detail = format!("{:#?}\n", processor);
        println!("{}", processor_detail);
    }

    Ok(processors)
}