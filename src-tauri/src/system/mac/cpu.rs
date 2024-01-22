use sysinfo::System;
use crate::system::mac::dto::Cpu;


pub fn get_cpu_info(system: &System) -> Cpu {
    let cpu = &system.cpus()[0];
    let cpu_name = cpu.name();
    let cpu_frequency = cpu.frequency();
    let cpu_vendor_id = cpu.vendor_id().to_string();
    let cpu_brand = cpu.brand().to_string();
    let core_count = system.physical_core_count().unwrap();

    println!("CPU name: {cpu_name}");
    println!("CPU frequency: {cpu_frequency}");
    println!("CPU vendor ID: {cpu_vendor_id}");
    println!("CPU brand: {cpu_brand}");
    println!("CPU core count: {core_count}");

    Cpu {
        frequency: cpu_frequency,
        vendor_id: cpu_vendor_id,
        brand: cpu_brand,
        core_count,
    }
}