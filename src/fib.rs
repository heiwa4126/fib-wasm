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

#[cfg(test)]
mod tests {
    use super::fib;

    #[test]
    fn returns_fibonacci_numbers() {
        assert_eq!(fib(0), 0.0);
        assert_eq!(fib(1), 1.0);
        assert_eq!(fib(10), 55.0);
        assert_eq!(fib(78), 8_944_394_323_791_464.0);
    }

    #[test]
    fn returns_nan_above_supported_range() {
        assert!(fib(79).is_nan());
        assert!(fib(u32::MAX).is_nan());
    }
}
