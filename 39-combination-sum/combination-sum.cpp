class Solution {
public:
    //this is where we are going to process our input and store result
   void helperCombination(int currentIndex, int n, vector<int> &candidates, int target, vector<int> &levels, vector<vector<int>> &result){
        if(target==0){
            result.push_back(levels);
            return;    
        }

        if(currentIndex ==n || target<0) return;  

        levels.push_back(candidates[currentIndex]);
        helperCombination(currentIndex, n, candidates, target-candidates[currentIndex], levels, result);
        levels.pop_back();
        helperCombination(currentIndex+1, n, candidates, target, levels, result);

    }


    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<int> levels;
        int n= candidates.size();
        vector<vector<int>> result;
        helperCombination(0, n, candidates, target, levels, result);
        return result;      
    }
};