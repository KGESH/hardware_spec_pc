use std::fmt;
use serde::{Deserialize, Serialize};
use sysinfo::System;

#[cfg(target_os = "macos")]
use crate::system::mac;

#[cfg(target_os = "windows")]
use crate::system::windows;


pub enum OsType {
    Windows,
    Mac,
}

impl fmt::Display for OsType {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            OsType::Mac => write!(f, "Darwin"),
            OsType::Windows => write!(f, "Windows"),
        }
    }
}

pub fn get_os_type() -> String {
    match System::name() {
        Some(os_type) => {
            match os_type.as_str() {
                "Windows" => OsType::Windows.to_string(),
                "Darwin" => OsType::Mac.to_string(),
                _ => panic!("Unsupported OS type: {}", os_type),
            }
        }
        None => panic!("Unsupported OS type: Unknown"),
    }
}

#[cfg(target_os = "macos")]
#[derive(Serialize, Deserialize, Debug)]
pub struct SystemInfo {
    pub os_type: String,
    pub system: mac::dto::MacSystem,
}

#[cfg(target_os = "windows")]
#[derive(Serialize, Deserialize, Debug)]
pub struct SystemInfo {
    pub os_type: String,
    pub system: windows::dto::WindowsSystem,
}
