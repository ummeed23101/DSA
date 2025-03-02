class Solution {
public:
    void helper(int start, int k, int target, vector<int> &levels, vector<vector<int>> &answer) {
        if (target == 0 && levels.size() == k) {
            answer.push_back(levels);
            return;
        }

        for (int i = start; i <= 9; i++) {
            if (target < i) break;  

            levels.push_back(i);
            helper(i + 1, k, target - i, levels, answer);
            levels.pop_back(); 
        }
    }

    vector<vector<int>> combinationSum3(int k, int n) {
        vector<vector<int>> answer;
        vector<int> levels;
        helper(1, k, n, levels, answer);
        return answer;
    }
};
