use serde::{Deserialize, Serialize};

use crate::system::windows::{
    Win32BaseBoard, Win32DiskDrive, Win32DiskDriveExpended, Win32OperatingSystem,
    Win32PhysicalMemory, Win32Processor, Win32SystemEnclosure, Win32VideoController,
};

#[derive(Serialize, Deserialize, Debug)]
pub struct WindowsSystem {
    pub os: Vec<Win32OperatingSystem>,
    pub platform: Vec<Win32SystemEnclosure>,
    pub cpu: Vec<Win32Processor>,
    pub motherboard: Vec<Win32BaseBoard>,
    pub gpu: Vec<Win32VideoController>,
    pub rams: Vec<Win32PhysicalMemory>,
    pub disks: Vec<Win32DiskDriveExpended>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct OS {
    pub name: String,
    pub kernel_version: String,
    pub version: String,
    pub hostname: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Cpu {
    pub frequency: u64,
    pub vendor_id: String,
    pub brand: String,
    pub core_count: usize,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Ram {
    pub total_memory: u64,
    pub free_memory: u64,
    pub used_memory: u64,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Disk {
    pub name: String,
    // "SSD" or "HDD"
    pub kind: String,
    pub file_system: String,
    pub total_space: u64,
    pub removable: bool,
}
