class Solution {
public:

    void dfs(int sr, int sc, int currentColor, int color, vector<vector<int>> &image, vector<vector<int>> &result){
        result[sr][sc]=color;

        vector<int> row = {-1, 0, 1, 0};
        vector<int> col = {0, 1, 0, -1};

        for(int i =0; i<4; i++){
            int nrow = row[i] +sr;
            int ncol = col[i] +sc;

            if (nrow >= 0 && nrow < result.size() && ncol >= 0 && ncol < result[0].size() &&
    result[nrow][ncol] != color && image[nrow][ncol] == currentColor)
{
                    dfs(nrow,ncol,currentColor,color, image, result);
                }
            }
        }

    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {
        int currentColor = image[sr][sc];
        vector<vector<int>> result(image.begin(), image.end());

        dfs(sr, sc, currentColor, color, image, result);

        return result;


    }
};