class Solution {
public:

    void helperSubsets(vector<int> &nums, vector<int> &levels, int n, set<vector<int>> &result, int currentIndex){
        
        if(currentIndex==n){
            result.insert(levels);
            return;
        }

        levels.push_back(nums[currentIndex]);
        helperSubsets(nums, levels, n, result, currentIndex+1);
        levels.pop_back();
        helperSubsets(nums, levels, n, result, currentIndex+1);
    }

    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        vector<int> levels;
        set<vector<int>> result;
        int n = nums.size();
        sort(nums.begin(), nums.end());
        helperSubsets(nums, levels,n, result, 0);
        vector<vector<int>> answer(result.begin(), result.end());

        return answer;
    }
};