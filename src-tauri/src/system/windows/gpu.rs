use serde::{Deserialize, Serialize};
use wmi::{WMIConnection, WMIDateTime};

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename = "Win32_VideoController")]
#[serde(rename_all = "PascalCase")]
pub struct Win32VideoController {
    pub adapter_compatibility: Option<String>,
    pub adapter_dac_type: Option<String>,
    pub adapter_ram: Option<u32>,
    pub caption: Option<String>,
    pub description: Option<String>,
    pub device_id: Option<String>,
    pub driver_date: Option<WMIDateTime>,
    pub driver_version: Option<String>,
    pub installed_display_drivers: Option<String>,
    pub name: Option<String>,
    pub video_processor: Option<String>,
    // ... add other fields as needed ...
}

pub fn get_gpu_info(wmi_con: &WMIConnection) -> Result<Vec<Win32VideoController>, Box<dyn std::error::Error>> {
    let video_controllers: Vec<Win32VideoController> = wmi_con.query()?;
    for video_controller in &video_controllers {
        let video_controller_detail = format!("{:#?}\n", video_controller);
        println!("{}", video_controller_detail);
    }

    Ok(video_controllers)
}