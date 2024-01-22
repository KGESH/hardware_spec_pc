#![allow(non_camel_case_types)]
#![allow(non_snake_case)]

mod cpu;
mod motherboard;
mod memory;
mod disk;
mod gpu;
mod os;
pub mod dto;


use serde::Deserialize;
use wmi::{COMLibrary, Variant, WMIConnection, WMIDateTime};
use cpu::Win32Processor;
use motherboard::Win32BaseBoard;
use memory::Win32PhysicalMemory;
use disk::Win32DiskDrive;
use gpu::Win32VideoController;
use os::Win32OperatingSystem;


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


    println!("========let windows_system = dto::WindowsSystem========");
    let windows_system = dto::WindowsSystem {
        os,
        cpu,
        motherboard,
        rams,
        disks,
        gpu,
    };


    Ok(windows_system)
}
