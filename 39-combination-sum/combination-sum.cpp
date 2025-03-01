class Solution {
public:

   void helper(int currentIndex, vector<int> &candidates, int n, int sum, vector<int> levels, vector<vector<int>> &result){
        if(currentIndex == n || sum<0){
            return;
        }
        if(sum==0){
            result.push_back(levels);
            return;
        }
        levels.push_back(candidates[currentIndex]);
        helper(currentIndex, candidates, n, sum - candidates[currentIndex], levels, result);
        levels.pop_back();
        helper(currentIndex+1, candidates, n, sum, levels, result);


    }
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        int n = candidates.size();
        int currentIndex = 0;

        int sum = target;
        vector<int> levels;
        vector<vector<int>> result;
        helper(currentIndex, candidates, n, sum, levels, result);

        return result;


    }
};