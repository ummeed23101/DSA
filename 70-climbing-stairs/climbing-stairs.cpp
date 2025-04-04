class Solution {
public:
    int helperClimb(int n, vector<int> &dp){
        if(n==0 || n==1) return 1;

        if(dp[n]!=-1) return dp[n];

        else{ dp[n] = helperClimb(n-1, dp) + helperClimb(n-2, dp);}

        return dp[n];
    }

    int climbStairs(int n) {
        vector<int> dp(n+1,-1);
        int ans = helperClimb(n, dp);

        return ans;
    }
};