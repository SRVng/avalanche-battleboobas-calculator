use wasm_bindgen::prelude::*;
#[wasm_bindgen]
pub fn calculate_reward(milk: f64, size: f64, prestige: f64) -> f64 {
    milk * size * prestige
}