class Solution {
public:

    int f(int indx, vector<int> &dp){
        if(indx ==0) return 1;
        if(indx==1) return 1;

        int right = dp[indx-2]>0?dp[indx-2]:f(indx-2, dp);
        int left = dp[indx-1]>0?dp[indx-1]:f(indx-1, dp);
        dp[indx] = left+right;

        return dp[indx];

    }
    int climbStairs(int n) {
        vector<int> dp(n+1,-1);
        int ans = f(n, dp);

        return ans;
    }
};