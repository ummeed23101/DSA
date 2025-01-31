class Solution {
public:

    int helperUniquePath(vector<vector<int>>& obstacleGrid, int m, int n, vector<vector<int>> &dp){     
        if(m<0 || n<0) return 0;
        if( obstacleGrid[0][0]==1) return 0;
        if(m==0 && n==0) return 1;

        if(obstacleGrid[m][n]==1) return 0;
        

        if(dp[m][n]!=-1) return dp[m][n];


        int up = helperUniquePath(obstacleGrid, m-1, n, dp);
        int left = helperUniquePath(obstacleGrid, m, n-1, dp);

        return dp[m][n]= up+left;
    }
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        

        int m = obstacleGrid.size();
        int n = obstacleGrid[0].size();

        vector<vector<int>> dp(m, vector<int>(n,-1));

        return helperUniquePath(obstacleGrid, m-1,n-1, dp);
    }
};