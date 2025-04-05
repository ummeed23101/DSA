class Solution {
public:
    void dfs(int row, int col, vector<vector<int>> &result, int m, int n, vector<vector<int>> &grid ){
        result[row][col]=0;

        vector<int> drow = {-1, 0, 1, 0};
        vector<int> dcol = {0, 1, 0, -1};

        for(int i=0; i<4; i++){
            int nrow = row + drow[i];
            int ncol = col + dcol[i];
            if(nrow >=0 && nrow<m  && ncol >=0 && ncol<n && grid[nrow][ncol]==1 && result[nrow][ncol]!=0){
                dfs(nrow, ncol, result, m, n, grid);
            }
        }
    }
    
    int numEnclaves(vector<vector<int>>& grid) {
        vector<vector<int>> result(grid.begin(), grid.end());
        int m = grid.size();
        int n = grid[0].size();
        for(int i=0; i<m; i++){
            for(int j=0; j<n; j++){
                if((i==0 || i==m-1 || j==0 || j==n-1) && grid[i][j]==1)
{
                    dfs(i,j,result,m,n,grid);
                }
            }
        }
        int resultCounter =0;
        for(int i=0; i<m; i++){
            for(int j=0; j<n; j++){
                if(result[i][j]==1){
                    resultCounter++;
                }
            }
        }

        return resultCounter;
    }
};