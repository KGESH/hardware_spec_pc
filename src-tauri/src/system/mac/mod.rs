use sysinfo::System;

mod cpu;
mod disk;
pub mod dto;
mod gpu;
mod memory;
mod os;

pub fn get_mac_system_info() -> dto::MacSystem {
    let mut sys = System::new_all();
    sys.refresh_all();

    println!("======== Mac System ========");
    let os_info = os::get_os_info();
    let cpu_info = cpu::get_cpu_info(&sys);
    let gpu_info = gpu::get_gpu_info(&sys);
    let memory_info = memory::get_memory_info(&sys);
    let disks_info = disk::get_disks_info();

    dto::MacSystem {
        os: os_info,
        cpu: cpu_info,
        gpu: gpu_info,
        rams: memory_info,
        disks: disks_info,
    }
}
