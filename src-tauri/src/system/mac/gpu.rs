use std::process::Command;
use sysinfo::System;
use crate::system::mac::dto::Gpu;

pub fn get_gpu_info(system: &System) -> Gpu {
    let output = Command::new("system_profiler")
        .args(["SPDisplaysDataType"])
        .output()
        .expect("Failed to execute command");

    let output_str = String::from_utf8_lossy(&output.stdout);

    let vendor_id = system.cpus()[0].vendor_id().to_string();
    let mut gpu_core_count = 0;
    let mut gpu_model = String::new();

    for line in output_str.lines() {
        println!("{}", line);

        if let Some(core_count) = parse_core_count(line) {
            gpu_core_count = core_count;
        } else if let Some(model) = parse_gpu_model(line) {
            gpu_model = model;
        }
    }


    Gpu {
        vendor_id,
        brand: gpu_model,
        core_count: gpu_core_count as usize,
    }
}

fn parse_core_count(line: &str) -> Option<u32> {
    if line.contains("Total Number of Cores") {
        line.split(":")
            .nth(1)
            .and_then(|s| s.trim().parse::<u32>().ok())
    } else {
        None
    }
}

fn parse_gpu_model(line: &str) -> Option<String> {
    if line.contains("Chipset Model") {
        line.split(":")
            .nth(1)
            .map(|s| s.trim().to_string())
    } else {
        None
    }
}
