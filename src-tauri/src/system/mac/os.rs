use sysinfo::System;
use crate::system::mac::dto::OS;


pub fn get_os_info() -> OS {
    let name = System::name().unwrap_or_else(|| "Unknown".to_string());
    let kernel_version = System::kernel_version().unwrap_or_else(|| "Unknown".to_string());
    let version = System::os_version().unwrap_or_else(|| "Unknown".to_string());
    let hostname = System::host_name().unwrap_or_else(|| "Unknown".to_string());

    // Display system information:
    println!("System name:             {:?}", name);
    println!("System kernel version:   {:?}", System::kernel_version());
    println!("System OS version:       {:?}", System::os_version());
    println!("System host name:        {:?}", System::host_name());

    OS {
        name,
        kernel_version,
        version,
        hostname,
    }
}