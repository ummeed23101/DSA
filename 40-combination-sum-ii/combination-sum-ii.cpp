class Solution {
public:

   void helper(int currentIndex, vector<int> &candidates, int n, int sum, vector<int> levels, vector<vector<int>> &result){
        if(sum==0){
            result.push_back(levels);
            return;
        }
        if(currentIndex == n || sum<0){
            return;
        }

        levels.push_back(candidates[currentIndex]);
        helper(currentIndex+1, candidates, n, sum - candidates[currentIndex], levels, result);
        levels.pop_back();

        for(int i=currentIndex+1; i<n; i++){
            if(candidates[i]!=candidates[currentIndex]){
                helper(i,candidates, n, sum, levels, result);
                break;
            }
        }


    }
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        int n = candidates.size();
        int currentIndex = 0;
        sort(candidates.begin(), candidates.end());
        int sum = target;
        vector<int> levels;
        vector<vector<int>> result;
        helper(currentIndex, candidates, n, sum, levels, result);

        return result;


    }
};

