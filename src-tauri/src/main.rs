// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

mod event;
pub mod system;


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![event::get_system_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// Todo: Remove after build success
// #[cfg(target_os = "windows")]
// fn main() {
//     tauri::Builder::default()
//         .invoke_handler(tauri::generate_handler![
//             event::get_system_info,
//             event::get_windows_system_info
//         ])
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }
