class Solution {
public:
   void helper(int currentIndex, int target, int k, vector<int> levels, vector<vector<int>> &answer, vector<int> &nums) {
        if (target == 0 && levels.size() == k) {
            answer.push_back(levels);
            return;
        }
        if (target < 0 || levels.size() > k || currentIndex == nums.size()) return;  


        levels.push_back(nums[currentIndex]);
        helper(currentIndex + 1, target - nums[currentIndex], k, levels, answer, nums);
        levels.pop_back();
        helper(currentIndex + 1, target, k, levels, answer, nums);
    }

    vector<vector<int>> combinationSum3(int k, int n) {
        vector<int> nums = {1,2,3,4,5,6,7,8,9};
        vector<int> levels;
        vector<vector<int>> answer;

        helper(0, n, k, levels, answer, nums);
        return answer;
    }
};
