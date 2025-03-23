class Solution {
public:

   void helperCombination2(vector<int>& candidates, int target, int n, int currentIndex, vector<int> levels, vector<vector<int>> &result){

        if(target==0){
            result.push_back(levels);
            return;
        }
        //base case
        if(currentIndex == n || target<0) return;

        
        levels.push_back(candidates[currentIndex]);
        helperCombination2(candidates, target- candidates[currentIndex], n, currentIndex+1, levels, result);
        levels.pop_back();

        for(int i=currentIndex+1; i<n; i++){
            if(candidates[currentIndex]!= candidates[i]){
                helperCombination2(candidates, target, n , i, levels, result);
                break;
            }
        }

    }

    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        vector<int> levels;
        vector<vector<int>> result;
        sort(candidates.begin(), candidates.end());
        int n = candidates.size();
        helperCombination2(candidates, target, n, 0, levels, result);

        return result;
    }
};