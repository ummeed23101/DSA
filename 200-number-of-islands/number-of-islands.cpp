class Solution {
public:

    void bfs(vector<vector<char>>& grid, int n, int m, vector<vector<int>> &visited, int row, int col){
        visited[row][col]=1;

        queue<pair<int,int>> q;

        q.push({row,col});

        while(!q.empty()){
            pair<int,int> node = q.front();
            q.pop();

            for(int i=-1 ;i<=1; i++){
                for(int j=-1; j<=1; j++){
                if(abs(i)+abs(j)!=1) continue;
                 int nrow =   node.first + i;
                 int ncol = node.second + j;

                    if(nrow>=0 && nrow<n && ncol>=0 && ncol<m &&visited[nrow][ncol]!=1 && grid[nrow][ncol]=='1'){  
                        q.push({nrow,ncol});
                        visited[nrow][ncol]=1;
                    }
                }
            }
            
        }

    }



    int numIslands(vector<vector<char>>& grid) {
        int n = grid.size();
        int m = grid[0].size();

        vector<vector<int>> visited(n, vector<int> (m,0));

        int result = 0;

        for(int i=0; i<n; i++){
            for(int j=0; j<m; j++){
                if(grid[i][j]=='1' && visited[i][j]==0){
                    result++;
                    bfs(grid, n, m, visited, i, j);
                }
            }
        }

        return result;
    }
};