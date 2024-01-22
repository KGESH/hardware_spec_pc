use crate::system;

#[tauri::command]
pub fn get_system_info() -> system::common::SystemInfo {
    system::get_system_info()
}
