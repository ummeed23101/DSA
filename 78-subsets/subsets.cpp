class Solution {
public:

    void helperSubsets(int currentPos, vector<int> levels, vector<vector<int>> &result, int n, vector<int> &nums){
        if(currentPos>n) return;

        if(currentPos==n){
            result.push_back(levels);
            return;
        }
        levels.push_back(nums[currentPos]);
        helperSubsets(currentPos+1, levels, result, n, nums);
        levels.pop_back();
        helperSubsets(currentPos+1, levels, result, n, nums);


    }

    vector<vector<int>> subsets(vector<int>& nums) {
        int n = nums.size();
        vector<vector<int>> result;
        vector<int> levels;

        helperSubsets(0, levels, result, n, nums);

        return result;

    }
};