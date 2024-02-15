use serde::{Deserialize, Serialize};
use wmi::{WMIConnection, WMIDateTime};

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename = "Win32_SystemEnclosure")]
#[serde(rename_all = "PascalCase")]
pub struct Win32SystemEnclosure {
    pub chassis_types: Option<Vec<u16>>, // 3: Desktop, 9: Laptop, 10: Notebook
}

pub fn get_platform_info(
    wmi_con: &WMIConnection,
) -> Result<Vec<Win32SystemEnclosure>, Box<dyn std::error::Error>> {
    let platforms: Vec<Win32SystemEnclosure> = wmi_con.query()?;
    for platform in &platforms {
        let platform_detail = format!("{:#?}\n", platform);
        println!("{}", platform_detail);
    }

    Ok(platforms)
}
