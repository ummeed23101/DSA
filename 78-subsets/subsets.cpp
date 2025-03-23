class Solution {
public:

    void helperSubsets(vector<int> &nums, vector<int> &levels, int n, vector<vector<int>> &result, int currentIndex){

        if(currentIndex==n){
            result.push_back(levels);
            return;
        }

        levels.push_back(nums[currentIndex]);
        helperSubsets(nums, levels, n, result, currentIndex+1);
        levels.pop_back();
        helperSubsets(nums, levels, n, result, currentIndex+1);
    }
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<int> levels;
        vector<vector<int>> result;
        int n = nums.size();
        helperSubsets(nums, levels,n, result, 0);

        return result;
    }
};