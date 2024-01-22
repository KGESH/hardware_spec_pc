use serde::{Deserialize, Serialize};
use wmi::{WMIConnection, WMIDateTime};

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename = "Win32_BaseBoard")]
#[serde(rename_all = "PascalCase")]
pub struct Win32BaseBoard {
    pub caption: Option<String>,
    pub config_options: Option<Vec<String>>,
    pub creation_class_name: Option<String>,
    pub depth: Option<f32>,
    pub description: Option<String>,
    pub height: Option<f32>,
    pub hosting_board: Option<bool>,
    pub hot_swappable: Option<bool>,
    pub install_date: Option<WMIDateTime>,
    pub manufacturer: Option<String>,
    pub model: Option<String>,
    pub name: Option<String>,
    pub other_identifying_info: Option<String>,
    pub part_number: Option<String>,
    pub powered_on: Option<bool>,
    pub product: Option<String>,
    pub removable: Option<bool>,
    pub replaceable: Option<bool>,
    pub requirements_description: Option<String>,
    pub requires_daughter_board: Option<bool>,
    pub serial_number: Option<String>,
    pub sku: Option<String>,
    pub slot_layout: Option<String>,
    pub special_requirements: Option<bool>,
    pub status: Option<String>,
    pub tag: Option<String>,
    pub version: Option<String>,
    pub weight: Option<f32>,
    pub width: Option<f32>,
    // ... add other fields as needed ...
}

pub fn get_motherboard_info(wmi_con: &WMIConnection) -> Result<Vec<Win32BaseBoard>, Box<dyn std::error::Error>> {
    let boards: Vec<Win32BaseBoard> = wmi_con.query()?;
    for board in &boards {
        let board_detail = format!("{:#?}\n", board);
        println!("{}", board_detail);
    }

    Ok(boards)
}