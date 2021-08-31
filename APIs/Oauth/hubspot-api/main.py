import requests
import json
import urllib
from urllib.parse import urlencode

def get_contacts():
    max_results = 500
    hapikey = 'demo'
    count = 5
    contact_list = []
    property_list = []
    get_all_contacts_url = "https://api.hubapi.com/contacts/v1/lists/all/contacts/all?"
    parameter_dict = {
        'hapikey': '344945d8-e6c9-4b67-a458-fa0637082a74', 'count': 2}
    headers = {}

    # Paginate your request using offset
    has_more = True
    while has_more:
        parameters = urlencode(parameter_dict)
        get_url = get_all_contacts_url + parameters
        r = requests.get(url=get_url, headers=headers)
        response_dict = json.loads(r.text)
        has_more = response_dict['has-more']
        contact_list.extend(response_dict['contacts'])
        parameter_dict['vidOffset'] = response_dict['vid-offset']
        # Exit pagination, based on whatever value you've set your max results variable to.
        if len(contact_list) >= max_results:
            print('maximum number of results exceeded')
            break
    print('loop finished')

    list_length = len(contact_list)

    print(contact_list)

    print("You've succesfully parsed through {} contact records and added them to a list".format(list_length))


def get_deals():
    max_results = 500 
    hapikey = '344945d8-e6c9-4b67-a458-fa0637082a74' 
    limit = 5 
    deal_list = []
    get_all_deals_url = "https://api.hubapi.com/deals/v1/deal/paged?"
    parameter_dict = {'hapikey': hapikey, 'limit': limit}
    headers = {}

    # Paginate your request using offset
    has_more = True
    while has_more:
        parameters = urllib.parse.urlencode(parameter_dict)
        get_url = get_all_deals_url + parameters
        r = requests.get(url= get_url, headers = headers)
        response_dict = json.loads(r.text)
        has_more = response_dict['hasMore']
        deal_list.extend(response_dict['deals'])
        parameter_dict['offset']= response_dict['offset']
        if len(deal_list) >= max_results: # Exit pagination, based on whatever value you've set your max results variable to.
            print('maximum number of results exceeded')
            break
    
    print('loop finished')
    print(deal_list)

    list_length = len(deal_list) 

    print("You've succesfully parsed through {} deal records and added them to a list".format(list_length))


get_deals()