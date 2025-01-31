class Solution {
public:

//helperUniquePaths(m, k) means number of ways to reach at m,k from 0,0

    int helperUniquePaths(int m, int n, vector<vector<int>> &dp){
        if(m<0 || n<0){
            return 0;
        }
        if(dp[m][n]!=-1) return dp[m][n];
        
        if(m==0 && n==0)
        {
            dp[m][n]=1;
            return dp[m][n];
        }



    int up = helperUniquePaths(m-1, n, dp);
    int left = helperUniquePaths(m, n-1, dp);

    dp[m][n]=left+up;

    return dp[m][n];


    }


    int uniquePaths(int m, int n) {
        vector<vector<int>> dp(m, vector<int>(n,-1));

       int ans= helperUniquePaths(m-1, n-1, dp);

        return ans;
    }
};