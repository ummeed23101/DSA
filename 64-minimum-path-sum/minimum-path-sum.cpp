class Solution {
public:

    int helper(int m, int n, vector<vector<int>>& grid, vector<vector<int>>& dp){
        if(m<0 || n<0) return 1e9;

        if(m==0 && n==0) return grid[m][n];
        if(dp[m][n]!=-1) return dp[m][n];
        int up = grid[m][n] + helper(m-1, n, grid, dp);
        int left = grid[m][n] + helper(m, n-1, grid, dp);

        return dp[m][n] = min(up,left);
    }
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();

        vector<vector<int>> dp(m, vector<int>(n, -1));

        return helper(m-1, n-1, grid, dp);

        
    }
};