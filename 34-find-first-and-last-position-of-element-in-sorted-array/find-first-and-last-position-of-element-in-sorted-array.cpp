class Solution {
public:
     void firstOcc(vector<int> nums, int target, vector<int> &answer){ //[5,7,7,8,8,10] & 8
        int n = nums.size(); //6
 
        int left = 0; 
        int right = n-1; 

        
        while(left<=right){  
            int mid = left + (right-left)/2; 
            
            if(nums[mid]==target){ //7 false, 8 true, 
                if(mid==0){
                    answer.push_back(mid); 
                    break;
                }
                else if(nums[mid-1]==nums[mid]){
                    right = mid-1;
                }
                else{
                    answer.push_back(mid); 
                    break;
                }
            }

            else if(nums[mid]>target){ //false
                right =mid-1;
            }
            else{ //true
                left = mid+1; //left = 3
            }
        }

    }


    void lastOcc(vector<int> nums, int target, vector<int> &answer){
        int n = nums.size();

        int left = 0;
        int right = n-1;

        
        while(left<=right){
            int mid = left + (right-left)/2;

            if(nums[mid]==target){
                if(mid==n-1)
                {
                    answer.push_back(mid);
                    break;
                }
                
                else if(nums[mid+1]==nums[mid]){
                    left = mid+1;
                }
                else{
                    answer.push_back(mid);
                    break;
                }
        }

            else if(nums[mid]>target){
                right =mid-1;
            }
            else{
                left = mid+1;
            }
        }
    }

    vector<int> searchRange(vector<int> &nums, int target) {
        vector<int> answer;

        firstOcc(nums, target, answer);
        lastOcc(nums, target, answer);
    
        return answer.size() == 0 ? vector<int>{-1, -1} : answer;

    } 
};