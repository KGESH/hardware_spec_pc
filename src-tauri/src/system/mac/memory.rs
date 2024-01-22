use sysinfo::{System};
use crate::system::mac::dto::Ram;


pub fn get_memory_info(system: &System) -> Vec<Ram> {
    let total_memory = system.total_memory();
    let free_memory = system.free_memory();
    let used_memory = system.used_memory();

    println!("Total memory: {}", total_memory);
    println!("Free memory: {}", free_memory);
    println!("Used memory: {}", used_memory);

    vec![Ram {
        total_memory,
        free_memory,
        used_memory,
    }]
}
