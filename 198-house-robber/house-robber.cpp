class Solution {
public:


    int helper(vector<int> &nums, vector<int> &dp, int index){
        if(index<0) return 0;
        if(index == 0) return nums[index];

        if(dp[index]!=-1) return dp[index];

        int take = nums[index] + helper(nums, dp, index-2);
        int notTake = 0 + helper(nums, dp, index -1);

        return dp[index] = max(take, notTake);
    }
    int rob(vector<int>& nums) {
        int n = nums.size();
        vector<int> dp(n,-1);


        int ans = helper(nums, dp, n-1);

        return ans;


    }
};