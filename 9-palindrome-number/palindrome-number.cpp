class Solution {
public:
    bool isPalindrome(int x) {
        long long y =x;
        if(x<0) return false;
        long long reversed = 0;

        while (x!=0) {
            int digit = x % 10;
            reversed = reversed * 10 + digit;
            x/= 10;
        }

        if(y==reversed) return true;

        return false;
    }
};