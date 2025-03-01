class Solution {
public:

    void helper(int currentPos, int sum, vector<int> &candidates, int target, vector<int> levels, set<vector<int>> &st, int n){
        if(currentPos>=n) return;
        if(sum>target) return;

        if(sum==target){
            st.insert(levels);
            return;
        }

        levels.push_back(candidates[currentPos]);
        helper(currentPos+1, sum + candidates[currentPos], candidates, target, levels, st, n);
        helper(currentPos, sum + candidates[currentPos], candidates, target, levels, st, n);

        levels.pop_back();
        helper(currentPos+1, sum, candidates, target, levels, st, n);
    }

    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        //your code goes here
        set<vector<int>> st;
        vector<int> levels;
        int sum=0;
        int n = candidates.size();
        helper(0, sum, candidates, target, levels, st, n);
        vector<vector<int>> result(st.begin(), st.end());

        return result;
    }
};