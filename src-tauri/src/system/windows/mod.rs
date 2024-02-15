#![allow(non_camel_case_types)]
#![allow(non_snake_case)]

mod cpu;
mod disk;
pub mod dto;
mod gpu;
mod memory;
mod motherboard;
pub mod native;
mod os;
mod platform;

use cpu::Win32Processor;
use disk::{Win32DiskDrive, Win32DiskDriveExpended};
use gpu::Win32VideoController;
use memory::Win32PhysicalMemory;
use motherboard::Win32BaseBoard;
use os::Win32OperatingSystem;
use platform::Win32SystemEnclosure;
use serde::Deserialize;
use wmi::{COMLibrary, Variant, WMIConnection, WMIDateTime};

// Todo: remove example code
pub fn get_windows_system_info() -> Result<dto::WindowsSystem, Box<dyn std::error::Error>> {
    println!("========get_windows_system_info========");

    let com_con = unsafe { COMLibrary::assume_initialized() };
    println!("========let wmi_con = WMIConnection::new(com_con.into())?;========");
    let wmi_con = WMIConnection::new(com_con.into())?;

    println!("========let cpu = cpu::get_cpu_info(&wmi_con)?;========");
    let cpu = cpu::get_cpu_info(&wmi_con)?;
    println!("========let motherboard = motherboard::get_motherboard_info(&wmi_con)?;========");
    let motherboard = motherboard::get_motherboard_info(&wmi_con)?;
    println!("========let rams = memory::get_rams_info(&wmi_con)?;========");
    let rams = memory::get_rams_info(&wmi_con)?;
    println!("========let disks = disk::get_disks_info(&wmi_con)?;========");
    let disks = disk::get_disks_info(&wmi_con)?;
    println!("========let gpu = gpu::get_gpu_info(&wmi_con)?;========");
    let gpu = gpu::get_gpu_info(&wmi_con)?;
    println!("========let os = os::get_os_info(&wmi_con)?;========");
    let os = os::get_os_info(&wmi_con)?;
    let platform = platform::get_platform_info(&wmi_con)?;

    println!("========let windows_system = dto::WindowsSystem========");
    let windows_system = dto::WindowsSystem {
        os,
        platform,
        cpu,
        motherboard,
        rams,
        disks,
        gpu,
    };

    Ok(windows_system)
}
