class Solution {
public:
    int smallestDivisor(vector<int>& nums, int threshold) {
        int left = 1;
       int right = *max_element(nums.begin(),nums.end());

       
       int possibleDivisor;
       while(left<=right){
               int totalSum = 0;

          double mid = left + (right - left)/2;
          for(auto it: nums) totalSum+= ceil(it/mid);

          if(totalSum<=threshold){

              possibleDivisor = mid;
              right = mid - 1;
        }
        else
        {
            left = mid +1;
        }
       }

       return possibleDivisor;
    }
    
};