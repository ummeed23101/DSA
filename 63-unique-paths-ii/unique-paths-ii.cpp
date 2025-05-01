class Solution {
public:

    int helper(vector<vector<int>> &matrix, vector<vector<int>> &dp, int m, int n, int currRow, int currCol){
        if(currRow<0 || currCol<0) return 0;

        if(currRow==0 && currCol==0){
            return 1;
        }

        if(dp[currRow][currCol]!=-1) return dp[currRow][currCol];
        int up=0; int left = 0;
        if(currRow-1 >=0 && matrix[currRow-1][currCol]==0) up = helper(matrix, dp, m, n, currRow-1, currCol);
        if(currCol-1 >=0 && matrix[currRow][currCol-1]==0) left = helper(matrix, dp , m , n ,currRow, currCol-1);

        return dp[currRow][currCol] = left + up;

    }



    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int m = obstacleGrid.size();
        int n = obstacleGrid[0].size();

        vector<vector<int>> dp (m, vector<int>(n,-1));
        if(obstacleGrid[m-1][n-1]==1) return 0;
        int ans = helper(obstacleGrid, dp, m, n, m-1, n-1);

        return ans;
    }
};