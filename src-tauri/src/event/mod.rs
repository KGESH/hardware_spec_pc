use crate::system;

#[tauri::command]
pub fn get_system_info() -> system::common::SystemInfo {
    let info =  system::get_system_info();
    println!("info: {:?}", info);

    info
}

// #[cfg(target_os = "windows")]
// #[tauri::command]
// pub fn get_windows_system_info() -> String {
//     system::get_windows_system_info()
// }