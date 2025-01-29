


class Solution {
public:
    double powerFunc(double x, long long n) {
        if (n == 0) return 1; 

        if (n % 2 == 0) {
            double halfPower = powerFunc(x, n / 2);
            return halfPower * halfPower;
        } else {
            return x * powerFunc(x, n - 1);
        }
    }

    double myPow(double x, int n) {
        long long exp = n; 

        if (exp < 0) {
            x = 1 / x;
            exp = -exp; 
        }

        return powerFunc(x, exp);
    }
};
