class Solution {
public:
    
    void helperExist(vector<vector<char>>& board, string& word, bool& answer, int wordIndex, int currentX, int currentY, int m, int n) {
        if (answer) return;

        if (wordIndex == word.length() - 1 && board[currentX][currentY] == word[wordIndex]) {
            answer = true;
            return;
        }

        char temp = board[currentX][currentY];
        board[currentX][currentY] = '#';

        vector<int> dx = {-1, 0, 1, 0};
        vector<int> dy = {0, 1, 0, -1};

        for (int i = 0; i < 4; i++) {
            int nrow = currentX + dx[i];
            int ncol = currentY + dy[i];

            if (nrow >= 0 && nrow <= m && ncol >= 0 && ncol <= n && board[nrow][ncol] == word[wordIndex + 1]) {
                helperExist(board, word, answer, wordIndex + 1, nrow, ncol, m, n);
            }
        }

        board[currentX][currentY] = temp;
    }

    bool exist(vector<vector<char>>& board, string word) {
        int m = board.size();
        int n = board[0].size();
        bool answer = false;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] == word[0]) {
                    helperExist(board, word, answer, 0, i, j, m - 1, n - 1);
                    if (answer) return true;
                }
            }
        }

        return answer;
    }
};