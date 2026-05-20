#!/usr/bin/env python3
"""
Backend API Test Suite for LUX.SEX Lifestyle
Tests all banner endpoints and legacy status endpoints
"""
import requests
import json
from typing import Dict, Any, Optional

# Base URL from frontend/.env
BASE_URL = "https://premium-space-2.preview.emergentagent.com/api"

# Test results tracking
test_results = []
created_banner_id = None


def log_test(test_name: str, passed: bool, details: str = ""):
    """Log test result"""
    status = "✅ PASS" if passed else "❌ FAIL"
    result = f"{status} | {test_name}"
    if details:
        result += f"\n    Details: {details}"
    test_results.append({"name": test_name, "passed": passed, "details": details})
    print(result)


def test_root_endpoint():
    """Test 1: GET /api/ - should return welcome message"""
    try:
        response = requests.get(f"{BASE_URL}/", timeout=10)
        expected = {"message": "LUX.SEX Lifestyle API"}
        
        if response.status_code == 200 and response.json() == expected:
            log_test("GET /api/", True, f"Status: {response.status_code}, Response: {response.json()}")
        else:
            log_test("GET /api/", False, f"Status: {response.status_code}, Expected: {expected}, Got: {response.json()}")
    except Exception as e:
        log_test("GET /api/", False, f"Exception: {str(e)}")


def test_list_all_banners():
    """Test 2: GET /api/banners - should return list of seeded banners"""
    try:
        response = requests.get(f"{BASE_URL}/banners", timeout=10)
        
        if response.status_code == 200:
            banners = response.json()
            if isinstance(banners, list) and len(banners) == 7:
                # Check if sorted by priority desc
                priorities = [b.get("priority", 0) for b in banners]
                is_sorted = all(priorities[i] >= priorities[i+1] for i in range(len(priorities)-1))
                
                # Check required fields
                required_fields = ["id", "slot", "sponsor", "headline", "description", "cta", "link", "active", "priority", "created_at"]
                all_have_fields = all(all(field in banner for field in required_fields) for banner in banners)
                
                if is_sorted and all_have_fields:
                    log_test("GET /api/banners", True, f"Status: {response.status_code}, Count: {len(banners)}, Sorted by priority: {is_sorted}")
                else:
                    log_test("GET /api/banners", False, f"Sorted: {is_sorted}, All fields present: {all_have_fields}")
            else:
                log_test("GET /api/banners", False, f"Expected 7 banners, got {len(banners) if isinstance(banners, list) else 'non-list'}")
        else:
            log_test("GET /api/banners", False, f"Status: {response.status_code}, Response: {response.text}")
    except Exception as e:
        log_test("GET /api/banners", False, f"Exception: {str(e)}")


def test_filter_by_slot_lifestyle_premium():
    """Test 3: GET /api/banners?slot=lifestyle_premium - should return only lifestyle_premium banners"""
    try:
        response = requests.get(f"{BASE_URL}/banners?slot=lifestyle_premium", timeout=10)
        
        if response.status_code == 200:
            banners = response.json()
            if isinstance(banners, list):
                all_correct_slot = all(b.get("slot") == "lifestyle_premium" for b in banners)
                if all_correct_slot and len(banners) >= 1:
                    log_test("GET /api/banners?slot=lifestyle_premium", True, f"Status: {response.status_code}, Count: {len(banners)}")
                else:
                    log_test("GET /api/banners?slot=lifestyle_premium", False, f"All correct slot: {all_correct_slot}, Count: {len(banners)}")
            else:
                log_test("GET /api/banners?slot=lifestyle_premium", False, f"Response is not a list")
        else:
            log_test("GET /api/banners?slot=lifestyle_premium", False, f"Status: {response.status_code}")
    except Exception as e:
        log_test("GET /api/banners?slot=lifestyle_premium", False, f"Exception: {str(e)}")


def test_filter_by_slot_shop_top():
    """Test 4: GET /api/banners?slot=shop_top - should return shop_top banner"""
    try:
        response = requests.get(f"{BASE_URL}/banners?slot=shop_top", timeout=10)
        
        if response.status_code == 200:
            banners = response.json()
            if isinstance(banners, list):
                all_correct_slot = all(b.get("slot") == "shop_top" for b in banners)
                if all_correct_slot and len(banners) >= 1:
                    log_test("GET /api/banners?slot=shop_top", True, f"Status: {response.status_code}, Count: {len(banners)}")
                else:
                    log_test("GET /api/banners?slot=shop_top", False, f"All correct slot: {all_correct_slot}, Count: {len(banners)}")
            else:
                log_test("GET /api/banners?slot=shop_top", False, f"Response is not a list")
        else:
            log_test("GET /api/banners?slot=shop_top", False, f"Status: {response.status_code}")
    except Exception as e:
        log_test("GET /api/banners?slot=shop_top", False, f"Exception: {str(e)}")


def test_filter_by_slot_shop_grid():
    """Test 5: GET /api/banners?slot=shop_grid - should return multiple shop_grid banners"""
    try:
        response = requests.get(f"{BASE_URL}/banners?slot=shop_grid", timeout=10)
        
        if response.status_code == 200:
            banners = response.json()
            if isinstance(banners, list):
                all_correct_slot = all(b.get("slot") == "shop_grid" for b in banners)
                if all_correct_slot and len(banners) == 2:
                    log_test("GET /api/banners?slot=shop_grid", True, f"Status: {response.status_code}, Count: {len(banners)}")
                else:
                    log_test("GET /api/banners?slot=shop_grid", False, f"All correct slot: {all_correct_slot}, Expected 2, got {len(banners)}")
            else:
                log_test("GET /api/banners?slot=shop_grid", False, f"Response is not a list")
        else:
            log_test("GET /api/banners?slot=shop_grid", False, f"Status: {response.status_code}")
    except Exception as e:
        log_test("GET /api/banners?slot=shop_grid", False, f"Exception: {str(e)}")


def test_create_banner():
    """Test 6: POST /api/banners - create a new banner"""
    global created_banner_id
    try:
        payload = {
            "slot": "test_slot",
            "sponsor": "Test Sponsor",
            "headline": "Test Headline",
            "description": "Test desc",
            "cta": "Click",
            "link": "https://test.com",
            "priority": 50
        }
        response = requests.post(f"{BASE_URL}/banners", json=payload, timeout=10)
        
        if response.status_code == 201:
            banner = response.json()
            if "id" in banner and banner.get("headline") == "Test Headline":
                created_banner_id = banner["id"]
                log_test("POST /api/banners", True, f"Status: {response.status_code}, Created ID: {created_banner_id}")
            else:
                log_test("POST /api/banners", False, f"Missing id or incorrect data: {banner}")
        else:
            log_test("POST /api/banners", False, f"Status: {response.status_code}, Response: {response.text}")
    except Exception as e:
        log_test("POST /api/banners", False, f"Exception: {str(e)}")


def test_get_banner_by_id():
    """Test 7: GET /api/banners/{id} - fetch the created banner by id"""
    global created_banner_id
    if not created_banner_id:
        log_test("GET /api/banners/{id}", False, "No banner ID from previous test")
        return
    
    try:
        response = requests.get(f"{BASE_URL}/banners/{created_banner_id}", timeout=10)
        
        if response.status_code == 200:
            banner = response.json()
            if banner.get("id") == created_banner_id and banner.get("headline") == "Test Headline":
                log_test("GET /api/banners/{id}", True, f"Status: {response.status_code}, Retrieved banner with correct data")
            else:
                log_test("GET /api/banners/{id}", False, f"Data mismatch: {banner}")
        else:
            log_test("GET /api/banners/{id}", False, f"Status: {response.status_code}, Response: {response.text}")
    except Exception as e:
        log_test("GET /api/banners/{id}", False, f"Exception: {str(e)}")


def test_update_banner():
    """Test 8: PUT /api/banners/{id} - update the banner"""
    global created_banner_id
    if not created_banner_id:
        log_test("PUT /api/banners/{id}", False, "No banner ID from previous test")
        return
    
    try:
        payload = {
            "headline": "Updated Headline",
            "priority": 99
        }
        response = requests.put(f"{BASE_URL}/banners/{created_banner_id}", json=payload, timeout=10)
        
        if response.status_code == 200:
            banner = response.json()
            if banner.get("headline") == "Updated Headline" and banner.get("priority") == 99:
                log_test("PUT /api/banners/{id}", True, f"Status: {response.status_code}, Updated successfully")
            else:
                log_test("PUT /api/banners/{id}", False, f"Update not reflected: {banner}")
        else:
            log_test("PUT /api/banners/{id}", False, f"Status: {response.status_code}, Response: {response.text}")
    except Exception as e:
        log_test("PUT /api/banners/{id}", False, f"Exception: {str(e)}")


def test_delete_banner():
    """Test 9: DELETE /api/banners/{id} - delete the banner"""
    global created_banner_id
    if not created_banner_id:
        log_test("DELETE /api/banners/{id}", False, "No banner ID from previous test")
        return
    
    try:
        response = requests.delete(f"{BASE_URL}/banners/{created_banner_id}", timeout=10)
        
        if response.status_code == 200:
            result = response.json()
            if result.get("status") == "deleted" and result.get("id") == created_banner_id:
                log_test("DELETE /api/banners/{id}", True, f"Status: {response.status_code}, Deleted successfully")
            else:
                log_test("DELETE /api/banners/{id}", False, f"Unexpected response: {result}")
        else:
            log_test("DELETE /api/banners/{id}", False, f"Status: {response.status_code}, Response: {response.text}")
    except Exception as e:
        log_test("DELETE /api/banners/{id}", False, f"Exception: {str(e)}")


def test_get_deleted_banner():
    """Test 10: GET /api/banners/{deleted_id} - should return 404 after deletion"""
    global created_banner_id
    if not created_banner_id:
        log_test("GET /api/banners/{deleted_id} (404)", False, "No banner ID from previous test")
        return
    
    try:
        response = requests.get(f"{BASE_URL}/banners/{created_banner_id}", timeout=10)
        
        if response.status_code == 404:
            log_test("GET /api/banners/{deleted_id} (404)", True, f"Status: {response.status_code}, Correctly returns 404")
        else:
            log_test("GET /api/banners/{deleted_id} (404)", False, f"Status: {response.status_code}, Expected 404")
    except Exception as e:
        log_test("GET /api/banners/{deleted_id} (404)", False, f"Exception: {str(e)}")


def test_status_post():
    """Test 11: POST /api/status - legacy status check endpoint"""
    try:
        payload = {"client_name": "test"}
        response = requests.post(f"{BASE_URL}/status", json=payload, timeout=10)
        
        if response.status_code == 200:
            result = response.json()
            if "id" in result and result.get("client_name") == "test":
                log_test("POST /api/status", True, f"Status: {response.status_code}, Created status check")
            else:
                log_test("POST /api/status", False, f"Missing fields or incorrect data: {result}")
        else:
            log_test("POST /api/status", False, f"Status: {response.status_code}, Response: {response.text}")
    except Exception as e:
        log_test("POST /api/status", False, f"Exception: {str(e)}")


def test_status_get():
    """Test 12: GET /api/status - legacy status check endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/status", timeout=10)
        
        if response.status_code == 200:
            result = response.json()
            if isinstance(result, list):
                log_test("GET /api/status", True, f"Status: {response.status_code}, Retrieved {len(result)} status checks")
            else:
                log_test("GET /api/status", False, f"Expected list, got: {type(result)}")
        else:
            log_test("GET /api/status", False, f"Status: {response.status_code}, Response: {response.text}")
    except Exception as e:
        log_test("GET /api/status", False, f"Exception: {str(e)}")


def test_update_banner_empty_payload():
    """Test 13: PUT /api/banners/{id} with empty payload - should return 400"""
    try:
        # First create a banner to test with
        payload = {
            "slot": "test_empty_update",
            "sponsor": "Test",
            "headline": "Test",
            "description": "Test",
            "priority": 10
        }
        create_response = requests.post(f"{BASE_URL}/banners", json=payload, timeout=10)
        
        if create_response.status_code == 201:
            banner_id = create_response.json()["id"]
            
            # Try to update with empty payload
            empty_payload = {}
            update_response = requests.put(f"{BASE_URL}/banners/{banner_id}", json=empty_payload, timeout=10)
            
            if update_response.status_code == 400:
                log_test("PUT /api/banners/{id} (empty payload)", True, f"Status: {update_response.status_code}, Correctly returns 400")
            else:
                log_test("PUT /api/banners/{id} (empty payload)", False, f"Status: {update_response.status_code}, Expected 400")
            
            # Cleanup
            requests.delete(f"{BASE_URL}/banners/{banner_id}", timeout=10)
        else:
            log_test("PUT /api/banners/{id} (empty payload)", False, "Failed to create test banner")
    except Exception as e:
        log_test("PUT /api/banners/{id} (empty payload)", False, f"Exception: {str(e)}")


def test_active_only_filter():
    """Test 14: GET /api/banners with active_only parameter"""
    try:
        # Create an inactive banner
        payload = {
            "slot": "test_inactive",
            "sponsor": "Test",
            "headline": "Inactive Banner",
            "description": "Test",
            "active": False,
            "priority": 10
        }
        create_response = requests.post(f"{BASE_URL}/banners", json=payload, timeout=10)
        
        if create_response.status_code == 201:
            inactive_banner_id = create_response.json()["id"]
            
            # Test with active_only=true (default)
            response_active = requests.get(f"{BASE_URL}/banners", timeout=10)
            banners_active = response_active.json()
            
            # Test with active_only=false
            response_all = requests.get(f"{BASE_URL}/banners?active_only=false", timeout=10)
            banners_all = response_all.json()
            
            # Check if inactive banner is excluded from active_only=true
            inactive_in_active = any(b.get("id") == inactive_banner_id for b in banners_active)
            inactive_in_all = any(b.get("id") == inactive_banner_id for b in banners_all)
            
            if not inactive_in_active and inactive_in_all:
                log_test("GET /api/banners (active_only filter)", True, f"Inactive banner correctly filtered")
            else:
                log_test("GET /api/banners (active_only filter)", False, f"In active list: {inactive_in_active}, In all list: {inactive_in_all}")
            
            # Cleanup
            requests.delete(f"{BASE_URL}/banners/{inactive_banner_id}", timeout=10)
        else:
            log_test("GET /api/banners (active_only filter)", False, "Failed to create test banner")
    except Exception as e:
        log_test("GET /api/banners (active_only filter)", False, f"Exception: {str(e)}")


def print_summary():
    """Print test summary"""
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    passed = sum(1 for r in test_results if r["passed"])
    failed = sum(1 for r in test_results if not r["passed"])
    total = len(test_results)
    
    print(f"\nTotal Tests: {total}")
    print(f"Passed: {passed} ✅")
    print(f"Failed: {failed} ❌")
    print(f"Success Rate: {(passed/total*100):.1f}%\n")
    
    if failed > 0:
        print("Failed Tests:")
        for r in test_results:
            if not r["passed"]:
                print(f"  ❌ {r['name']}")
                if r["details"]:
                    print(f"     {r['details']}")
    
    print("="*80)


if __name__ == "__main__":
    print("="*80)
    print("LUX.SEX Lifestyle Backend API Test Suite")
    print(f"Base URL: {BASE_URL}")
    print("="*80 + "\n")
    
    # Run all tests in sequence
    test_root_endpoint()
    test_list_all_banners()
    test_filter_by_slot_lifestyle_premium()
    test_filter_by_slot_shop_top()
    test_filter_by_slot_shop_grid()
    test_create_banner()
    test_get_banner_by_id()
    test_update_banner()
    test_delete_banner()
    test_get_deleted_banner()
    test_status_post()
    test_status_get()
    test_update_banner_empty_payload()
    test_active_only_filter()
    
    # Print summary
    print_summary()
