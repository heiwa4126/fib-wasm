#[unsafe(no_mangle)]
pub extern "C" fn fib(n: u32) -> f64 {
    if n > 78 {
        return f64::NAN;
    }

    let (mut a, mut b) = (0_u64, 1_u64);

    for _ in 0..n {
        (a, b) = (b, a + b);
    }

    a as f64
}

fn main() {}
