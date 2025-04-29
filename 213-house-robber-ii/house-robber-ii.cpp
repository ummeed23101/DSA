class Solution {
public:

    int helper(vector<int> &nums, vector<int> &dp, int index){
        if(index<0) return 0;
        if(index==0) return nums[index];

        if(dp[index]!=-1) return dp[index];

        int take = nums[index] + helper(nums, dp , index-2);
        int notTake = 0 + helper(nums, dp, index-1);

        return dp[index] = max(take, notTake);


    }
    int rob(vector<int>& nums) {
        int n = nums.size();
        vector<int> nums1(nums.begin(), nums.end()-1);
        vector<int> nums2(nums.begin()+1, nums.end());

        vector<int> dp1(n,-1);
        vector<int> dp2(n,-1);


        int ans1 = helper(nums1, dp1, n-2);
        int ans2 = helper(nums2, dp2, n-2);

        if(n==1) return nums[0];
        return max(ans1, ans2); 
    }
};